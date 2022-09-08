import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { AccountDto } from "./dto/Account.dto";
import 'dotenv/config';

@Injectable()
export class AccountRepository {
    constructor(
        @Inject(process.env.KAFKA_NAME) private readonly client: ClientKafka,
    ) { }
    async createAccount(AccountDto: AccountDto[]) {
        return await this.produceAccount(AccountDto)
    }
    private async produceAccount(AccountDto: AccountDto[]): Promise<any> {
        if (AccountDto.length != undefined && AccountDto.length > 0) {
            for (let element of AccountDto) {
                this.client.emit(process.env.KAFKA_TOPIC1, { key: `${element.account_id}`, value: JSON.stringify(element) })
            }
        } else {
            console.log(JSON.stringify(AccountDto));
            this.client.emit(process.env.KAFKA_TOPIC1, { key: `${Object.values(AccountDto)[0]}`, value: JSON.stringify(AccountDto) })
        }
        return AccountDto
    }
}