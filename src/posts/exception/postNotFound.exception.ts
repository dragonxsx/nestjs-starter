import { NotFoundException } from '@nestjs/common';

// class PostNotFoundException extends HttpException {
//   constructor(postId: number) {
//     super(`Post with id ${postId}`, HttpStatus.NOT_FOUND);
//   }
// }

export class PostNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`Post with id ${postId} not found`);
  }
}
