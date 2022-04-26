import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export default class ParseStringPipe implements PipeTransform<string, string> {
  transform(value: string | undefined, metadata: ArgumentMetadata): string {
    if (typeof value === 'undefined') return '';

    return value;
  }
}
