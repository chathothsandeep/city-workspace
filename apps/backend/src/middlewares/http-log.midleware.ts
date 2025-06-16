import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpLogMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: any, res: any, next: (error?: any) => void) {
    const { method, originalUrl } = req;
    const start = Date.now();
    const body = JSON.stringify(req.body, null, 2);
    const headers = JSON.stringify(req.headers, null, 2);

    res!.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      this.logger.log(
        `HTTP Request:
                    Method: ${method}
                    Original URL: ${originalUrl}
                    Status Code: ${statusCode}
                    Body: ${body}
                    Headers: ${headers}
                    Duration: ${duration}ms`,
        'HTTP Request',
      );
    });
    next();
  }
}
