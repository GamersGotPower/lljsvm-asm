import arg from 'arg';
import inquirer from 'inquirer';
import { createMachineCode } from './main.js';

function parseArgIntoOptions(rawArgs) {
    const args = arg(
        {
        }, 
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        infile: args._[0],
        outfile: args._[1] || 'bin.bin',
        symfile: args._[2] || 'symbols.json',
        offset: args._[3] || 0
    }
}

async function prompt(options) {
    const questions = [];
    if (!options.infile) {
        questions.push({
            type: 'input',
            name: 'infile_path',
            message: 'Whats the name of the file you would like to Assemble?'
        });
    }

    const answers = await inquirer.prompt(questions)
    return {
        ...options,
        infile: answers.infile_path || options.infile,
        outfile: options.outfile,
        symfile: options.symbols,
        offset: options.offset
    }
}


export async function cli(args) {
    let options = parseArgIntoOptions(args);
    options = await prompt(options);
    await createMachineCode(options.infile, options.outfile, options.symfile, options.offset);
}