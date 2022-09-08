import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AccountCommand } from './commands/Account.command';
import { AccountDto } from './dto/Account.dto';

@Injectable()
export class AccountService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }
  async CreateAccountServiceHandler(AccountDto: AccountDto[]) {
    return await this.commandBus.execute(
      new AccountCommand(AccountDto),
    );
  }


}
