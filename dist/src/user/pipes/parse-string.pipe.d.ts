import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export default class ParseStringPipe implements PipeTransform<string, string> {
    transform(value: string | undefined, metadata: ArgumentMetadata): string;
}
