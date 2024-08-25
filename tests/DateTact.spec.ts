import { Blockchain, printTransactionFees, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { beginCell, toNano } from '@ton/core';
import { DateTact } from '../wrappers/DateTact';
import '@ton/test-utils';
const WHEN = {
    1598391481: '2020/08/25',
    1445812681: '2015/10/25',
    1450564681: '2015/12/19',
    951863881: '2000/02/29',
    3832812832: '2091/06/16',
}
describe('DateTact', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let dateTact: SandboxContract<DateTact>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        dateTact = blockchain.openContract(await DateTact.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await dateTact.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: dateTact.address,
            deploy: true,
            success: true,
        });
    });

    it('should date', async () => {
        for(const [when, need] of Object.entries(WHEN)){

            const {transactions} = await dateTact.send(
                deployer.getSender(),
                {
                    value: toNano('0.05'),
                },
                {
                    $$type: 'GetDate',
                    unixtime: BigInt(+when),
                }
            );
            printTransactionFees(transactions);
            expect(transactions).toHaveTransaction({
                from: dateTact.address,
                to: deployer.address,
                body: v=>{
                    if(!v) return false;
                    const parser = v!.beginParse();
                    parser.loadUint(32);
                    const value = parser.loadStringTail();
                    return value === need;
                },
            });
        }
        // the check is done inside beforeEach
        // blockchain and dateTact are ready to use
    });
});
