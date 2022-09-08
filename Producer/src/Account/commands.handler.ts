import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";;
import { AccountCommand } from "./commands/Account.command";
import { AccountRepository } from "./Account.repository";
import { AccountDto } from './dto/Account.dto';

@CommandHandler(AccountCommand)
export class AccountCommandHandler implements ICommandHandler<AccountCommand> {
    constructor(
        private readonly AccountRepo: AccountRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: AccountCommand, resolve: (value?) => void): Promise<any> {

        const Transactions = this.publisher.mergeObjectContext(
            await this.AccountRepo.createAccount(command.AccountDto),
        );
        return true;
    }
}