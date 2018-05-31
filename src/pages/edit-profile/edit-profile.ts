import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { ActionSheetController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import {NativeUserProvider} from '../../nativeProviders/nativeUser/nativeUser';
import {NativeApiProvider} from '../../nativeProviders/nativeApi/nativeApi';

declare var cordova: any;
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user:any = {};

  categories: any;
  interests: any;
  notinterests: any;

  imageURI:any;
  imageFileName:any;
  lastImage: any;
  defaultImage: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private file: File,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private userProvider : NativeUserProvider,
    private nativeApiProvider: NativeApiProvider) {

      this
      .userProvider
      .get()
      .then(data => {
        if (data) {
          this.user = data;
          console.log("curruser", this.user.id);
          this.imageFileName = this.user.picture;
        }
      });
  }

  ionViewDidLoad() {
    this.categories = this.navParams.get("categories");
    this.interests = this.navParams.get("interests");
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  getImage(source) {
    const options: CameraOptions = {
      quality: 10,
      sourceType: source,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imagePath) => {
     
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          var currentName ;
          if( imagePath.lastIndexOf('?') >= 0)
            currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          else
            currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
          console.log("correctpath:",correctPath);
          console.log("name:",currentName);
          //this.imageFileName = correctPath+currentName;
          console.log("file: ",this.imageFileName);
          
        });
        console.log("imagepath: ", imagePath);
        this.imageURI = imagePath;
        this.imageFileName = imagePath;
    }, (err) => {
      console.log(err);
      //this.presentToast(err);
    });
  }
  

  uploadFile() {
    var loader;
    let confirm = this.alertCtrl.create({
      title: 'Are you sure??',
      message: 'Did you fill up All the necessary information?',
      buttons: [
        {
          text: 'Go Back',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Submit',
          handler: () => {

            
            console.log('Agree clicked');
            loader = this.loadingCtrl.create({
              content: "Uploading..."
            });
              const fileTransfer: FileTransferObject = this.transfer.create();
    
              let options: FileUploadOptions = {
                fileKey: 'file',
                fileName: (new Date().getTime())+ ".jpg",
                chunkedMode: false,
                mimeType: "image/jpeg",
                headers: {}
              }
            
              fileTransfer.upload(this.imageURI, 'http://iitoverflow.herokuapp.com/api/users/'+this.user.id+'/updateProfile', options)
                .then((data) => {
                console.log(JSON.stringify(data)+" Uploaded Successfully");
                var us = JSON.parse(data.response);
                this.imageFileName = us.picture;
                this.user.picture = us.picture;
                this.nativeApiProvider.patch('/users/'+this.user.id,{"id": this.user.id,"displayname": this.user.displayname}).then(data=>{
                  
                  var data2 = JSON.parse(data.data);
                  this.user.displayname = data2.displayname;
                  loader.dismiss();
                  alert("success");
                }).catch(error=>{

                })
                
                console.log(us.picture);
                
                console.log("Image uploaded successfully");
              }, (err) => {
                console.log(JSON.stringify(err));
                loader.dismiss();
                console.log(err);
              });
            loader.present();
          }
        }
      ]
    });
    confirm.present();
   
  }

}
