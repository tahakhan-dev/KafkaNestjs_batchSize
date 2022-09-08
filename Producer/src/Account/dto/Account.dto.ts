import { IsNotEmpty } from 'class-validator';

export class AccountDto {
    @IsNotEmpty()
    account_id: string;

    @IsNotEmpty()
    consumer_id: string;

    @IsNotEmpty()
    account_type: string;

    @IsNotEmpty()
    active: string;

    @IsNotEmpty()
    balance_amount: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    opening_balance: string;

    @IsNotEmpty()
    is_sync: string;

    @IsNotEmpty()
    account_currency: string;

    @IsNotEmpty()
    bank_name: string;

    @IsNotEmpty()
    sys_defined: string;

    @IsNotEmpty()
    net_amount_total: string;

}
