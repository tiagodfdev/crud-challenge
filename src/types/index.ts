export interface IClient {
    _id:number;
    name:string;
    cpf:string;
    contact:{email:string,phone:string}
}
export interface IForm {
    id:string;
    label:string;
    type:string;
    placeholder:string|undefined;
    isDisableEditStatus:boolean;
    handleInputChange:React.ChangeEventHandler<HTMLInputElement>;
}