import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './post.entity';
import { PostNotFoundException } from './exception/postNotFound.exception';

@Injectable()
export class PostsService {
  // private lastPostId = 0;
  // private posts: Post[] = [];

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
  }

  async getAllPosts() {
    // return this.posts;

    return this.postRepository.find();
  }

  async getPostById(id: number) {
    // const post = this.posts.find(post => post.id === id);
    // if (post) {
    //   return post;
    // }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const post = await this.postRepository.findOne(id);
    if (post) {
      return post;
    }

    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto) {
    // const newPost = {
    //   id: ++this.lastPostId,
    //   ...post,
    // };
    // this.posts.push(newPost);
    // return newPost;

    const newPost = await this.postRepository.create(post);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async replacePost(id: number, post: UpdatePostDto) {
    // const postIndex = this.posts.findIndex(post => post.id === id);
    // if (postIndex > -1) {
    //   this.posts[postIndex] = post;
    //   return post;
    // }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    await this.postRepository.update(id, post);   // Acting as PATCH request
    const updatedPost = await this.postRepository.findOne(id);
    if (!updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    // const postIndex = this.posts.findIndex(post => post.id === id);
    // if (postIndex > -1) {
    //   this.posts.splice(postIndex, 1);
    //   return;
    // }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const deletedResponse = await this.postRepository.delete(id);
    if (!deletedResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
