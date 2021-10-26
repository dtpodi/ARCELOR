import { Component, OnInit } from "@angular/core";
import { Igcinfo } from "./gcinfo";
import { gcClientService } from "./gcinfo.service";

@Component({
    selector:'gc-info',
    templateUrl:'./gcinfo.component.html',
    styleUrls:['./gcinfo.component.css']
})

export class gcinfoComponent implements OnInit{
    pageTitle:string='GuidingCare Release Information';
    errorMessage:string='';
    private _clientFilter:string='';
    get clientFilter():string{
        return this._clientFilter;
    }

    set clientFilter(value:string){
        this._clientFilter = value;
        console.log('In setter:', value);
        this.filteredClients = this.performFilter(value);
    }

    filteredClients:Igcinfo[] = [];
    gcclientinfo: Igcinfo[] = [];

    constructor(private gcClientService: gcClientService){ }

    performFilter(filterBy:string):Igcinfo[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.gcclientinfo.filter((gcClient:Igcinfo) =>
            gcClient.clientName.toLocaleLowerCase().includes(filterBy));
    }

    ngOnInit(): void{
        this.gcClientService.getClients().subscribe({
            next: gcclientinfo=> {
                this.gcclientinfo=gcclientinfo;
                this.filteredClients=this.gcclientinfo;
            },
            error: err=>this.errorMessage=err
        })
        
    }
}