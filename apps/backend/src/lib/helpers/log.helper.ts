import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class LogHelper {
  private static instance: LogHelper;
  private constructor() {}

  public static getInstance(): LogHelper {
    if (!LogHelper.instance) {
      LogHelper.instance = new LogHelper();
    }
    return LogHelper.instance;
  }

  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${JSON.stringify(message)}`;
    console.log(entry);
    void this.logToFile(entry);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${JSON.stringify(message)}`;
    console.error(entry);
    void this.logToFile(entry);
  }
}
