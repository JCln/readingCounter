import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'randomImg', loadChildren: () => import('./random-images/random-images.module').then(randomImages => randomImages.RandomImagesModule) },
  { path: 'resultDetails', loadChildren: () => import('./img-result-details/img-result-details.module').then(imageAttributionResultDetails => imageAttributionResultDetails.ImgResultDetailsModule) },
  { path: 'excelBuild', loadChildren: () => import('./excel-builder/excel-builder.module').then(excelBuilder => excelBuilder.ExcelBuilderModule) },
  { path: 'downloadAI', loadChildren: () => import('./download-img-file/download-img-file.module').then(downloadFileAllImages => downloadFileAllImages.DownloadImgFileModule) },
  { path: 'downloadAITwo', loadChildren: () => import('./download-img-two-file/download-img-two-file.module').then(downloadFileAllImagesTWO2 => downloadFileAllImagesTWO2.DownloadImgTwoFileModule) },
  { path: 'uploadSingle', loadChildren: () => import('./file-upload-single/file-upload-single.module').then(fileUploadSingle => fileUploadSingle.FileUploadSingleModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
