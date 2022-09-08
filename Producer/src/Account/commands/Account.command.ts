import { ICommand } from '@nestjs/cqrs';
import { AccountDto } from '../dto/Account.dto';

export class AccountCommand implements ICommand {
    constructor(
        public readonly AccountDto: AccountDto[],
    ) { }
}
