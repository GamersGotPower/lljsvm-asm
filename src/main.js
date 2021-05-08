const assemble = require('./assembler');
import chalk from 'chalk'
import fs from 'fs';
import inquirer from 'inquirer';

export async function createMachineCode(infile, outfile, symfile, offset) {
    if(fs.existsSync(infile)){
        const fileData = fs.readFileSync(infile, 'utf8');
        const [machineCode, symbols] = assemble(fileData.trim(), offset)
        const savableData = machineCode.toString(16);
        const betterSymbols = JSON.stringify(symbols);

        fs.open(outfile, 'w+', async (err,fd) => {
            if (err) {
                if(err.code === 'EROFS') {
                    console.log(chalk.redBright(`${outfile} is read only, please try again`))
                } else {
                    console.log(chalk.redBright(err.message))
                }
            } else {
                if(await fs.existsSync(outfile)) {
                    const questions = [];
                    questions.push({
                        type: 'confirm',
                        name: 'canoverwrite',
                        message: `Do you want to overwrite '${outfile}'?`,
                        default: false
                    });

                    const answers = await inquirer.prompt(questions);
                    if(answers.canoverwrite) {
                        fs.writeFileSync(outfile, savableData)
                        fs.writeFileSync('symbols.json', betterSymbols)
                        console.log(chalk.greenBright(`Successfully compiled ${infile} to ${outfile} with a memory offset of ${offset} bytes`));
                        console.log(chalk.greenBright(`Symbols are saved in ${symfile}`));
                    } else {
                        console.log(chalk.yellow('Will not overwrite file; please try again'))
                    }
                } else {
                    fs.access(outfile, fs.constants.F_OK);
                    fs.writeFileSync(outfile, savableData)
                    fs.writeFileSync(symfile, betterSymbols)
                    console.log(chalk.greenBright(`Successfully compiled ${infile} to ${outfile} with a memory offset of ${offset} bytes`));
                    console.log(chalk.greenBright(`Symbols are saved in ${symfile}`));
                }
            }
        });
    } else {
        console.log(chalk.redBright(`${infile} does not exist; please try again`));
    }
}



//if(err.code === "EROFS") {
//    console.log(chalk.brightRed(`'${outfile}' can only be read!`));
//    return;
//} else if(err.code === "ENEONT") {
//    fs.writeFileSync(outfile, machineCode, function(err){
//        console.error(err);
//    });
//    fs.writeFileSync('symbols.mc', symbols, function(err){
//        console.error(err);
//    });
//    console.log(`Successfully compiled ${infile} to ${outfile}`);
//} else if (err.code !== 'ENOENT' || err.code !== 'EROFS') {
//    throw err;
//}
//
//fs.writeFileSync(outfile, machineCode, function(err){
//    console.error(err);
//});
//fs.writeFileSync('symbols.mc', symbols, function(err){
//    console.error(err);
//});
//console.log(`Successfully compiled ${infile} to ${outfile}`))