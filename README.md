# Tact contract to convert UNIX time to string

This project contains a simple smart contract that converts a UNIX timestamp to a human-readable string.

### Warning!

Calling function `int.asUnixTimeDateString("/")` with big values may case huge compute fees (for year=~2091 fee would be ~0.05 TON).

If you want to use this code in production, use **only in getter functions**!

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
