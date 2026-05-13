import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export async function runCommand(command, args = []) {
    const { stdout } = await execFileAsync(command, args, {
        windowsHide: true,
    });

    return stdout.trim();
}
