import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateCategoryDto {

  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string
}
