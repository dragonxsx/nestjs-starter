import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Post from './post.entity';
import { PostNotFoundException } from './exception/postNotFound.exception';
import User from '../users/user.entity';
import PostSearchService from './postSearch.service';

@Injectable()
export class PostsService {
  // private lastPostId = 0;
  // private posts: Post[] = [];

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private postsSearchService: PostSearchService,
  ) {
  }

  async getAllPosts() {
    // return this.posts;

    return this.postsRepository.find({ relations: ['author'] });
  }

  async getPostById(id: number) {
    // const post = this.posts.find(post => post.id === id);
    // if (post) {
    //   return post;
    // }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const post = await this.postsRepository.findOne(id, { relations: ['author'] });
    if (post) {
      return post;
    }

    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    // const newPost = {
    //   id: ++this.lastPostId,
    //   ...post,
    // };
    // this.posts.push(newPost);
    // return newPost;

    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    this.postsSearchService.indexPost(newPost);
    return newPost;
  }

  async replacePost(id: number, post: UpdatePostDto) {
    // const postIndex = this.posts.findIndex(post => post.id === id);
    // if (postIndex > -1) {
    //   this.posts[postIndex] = post;
    //   return post;
    // }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    await this.postsRepository.update(id, post);   // Acting as PATCH request
    const updatedPost = await this.postsRepository.findOne(id, { relations: ['author'] });
    if (updatedPost) {
      await this.postsSearchService.update(updatedPost);
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

    const deletedResponse = await this.postsRepository.delete(id);
    if (!deletedResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.postsSearchService.remove(id);
  }

  async searchForPosts(text: string) {
    const results = await this.postsSearchService.search(text);
    const ids = results.map(result => result.id);
    if (!ids.length) {
      return [];
    }
    return this.postsRepository.find({
      where: { id: In(ids) },
    });
  }
}
