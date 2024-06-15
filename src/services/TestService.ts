import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
    constructor(){};
    execute() :Output{

        return {
            code: 200,
            message: "Ok, Funcionou"
        }

    }
}

type Output = {
    code: number;
    message: string;
}