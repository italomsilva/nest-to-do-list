import { Controller, Get } from "@nestjs/common";
import { TestService } from "src/services/TestService";

@Controller()
export class TestController{
    constructor(
        private readonly testService:TestService
    ){}
    @Get('/test-aplication')
    runTest(){
        return this.testService.execute();
    }
}