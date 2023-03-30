import { IsNotEmpty } from 'class-validator';

export class IsFieldDuplicateDto {
  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  fieldValue: string;
}
