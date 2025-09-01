import { exec } from 'child_process';
import os from 'os';
import path from 'path';

const exec_command = ({ command, projects_directory }) => {
    const home = os.homedir();
    const baseDir = path.join(home, projects_directory);
    return new Promise((resolve, reject) => {
        exec(command, { cwd: baseDir }, (error, stdout, stderr) => {
            if (error) {
                console.log("Error: ", error)
                return reject({ message: error.message });
            }

            return resolve({ success: true, stdout });
        });
    });
};

export default exec_command;
