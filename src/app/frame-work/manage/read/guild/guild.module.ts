import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';
import { GuildRoutingModule } from './guild-routing.module';
import { GuildComponent } from './guild.component';


@NgModule({
  declarations: [
    GuildComponent
  ],
  imports: [
    SharedPrimeNgModule,
    GuildRoutingModule
  ]
})
export class GuildModule { }
