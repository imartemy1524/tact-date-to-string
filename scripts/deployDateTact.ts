import { toNano } from '@ton/core';
import { DateTact } from '../wrappers/DateTact';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const dateTact = provider.open(await DateTact.fromInit());

    await dateTact.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(dateTact.address);

    // run methods on `dateTact`
}
