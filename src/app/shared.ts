import { InteractionService } from './services/interaction.service';

let title: string = '';
export class Shared {

    constructor(private readonly interactionService: InteractionService) { }
    title = this.interactionService.getPageTitle().subscribe(title => this.title = title)
}
