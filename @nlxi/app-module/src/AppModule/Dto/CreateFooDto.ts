import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFooDto {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
