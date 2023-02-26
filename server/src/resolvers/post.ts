import {EntityManager} from "@mikro-orm/postgresql"
import {Post} from "../entities/Post"
import {Arg, Ctx, Int, Query, Resolver} from "type-graphql"

type MyContext = {
    em: EntityManager
}

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() {em}: MyContext): Promise<Array<Post>> {
        return em.find(Post, {})
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg("id", () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, {id})
    }
}
