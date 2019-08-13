### Implementing authentication with Nest.js
> *A word of advice: don't take this code as ready to be used in your production application! I am not a security specialist and there are many important points I missed in this example (either on purpose for the sake of keeping the code as simple as possible, or I just missed the required knowledge to implement it properly)!*

The first rule of security: don't implement it yourself! That stands true for authentication as well. The best advice I could give here is to just use a mature authentication/authorization service like Auth0, AWS Cognito or others. In this way you won't have to manage and store credentials yourself (which is a huge task: think about hashing and storing passwords, session management, sensitive data encryption, choosing the right algorithms for hashing and encryption, properly applying those algorithms, managing who is able to access that sensitive data, backup and restore in case of failure - not yet convinced it is a hard task?!)
If you really really have to implement authentication logic yourself into your application, use mature frameworks like Spring or Apache Shiro for Java.


In this example we will use Passport library with JSON Web Token as a way to authenticate the users of the application.
The official tutorial from NestJS is quite good in presenting how you could add authentication to your application. So before going further I recommend reading it and even implementing it in your application.
https://docs.nestjs.com/techniques/authentication

There are a few things in that tutorial and their example project that I don't like. I think is a really bad idea to give people insecure code as an example, especially on the official tutorials of security libraries. Unfortunately NestJS falls into that trap as well - even though they give clear hints that you shouldn't use that code in production, I think it would be better to give users code that is safe to use. That being said, here are the things I don't like and which I am trying to address in the rest of this material:
1. don't hardcode keys or secrets into your code
1. the API is open by default
1. use asymmetrics (public and private) key for signing and verifying the JWT token

Let's see in more detail what each of the points mean. I hope there is no need to explain why the first point is a really bad idea. Having keys or other kinds of secrets into your source code repository will expose you to a lot of troubles, in this case an attacker will be able to issue a valid JWT token on your behalf and basically impersonate any user from your system. You should treat the secrets very carefully by storing them in a secrets vault and injecting them into your application through environment variables at runtime. See XXX for more details.

The problem with the second point is that, with the implementation they provide, if I forget to annotate an endpoint with `@UseGuards(AuthGuard())` or a similar decorator, this endpoint will be available to anyone without any authentication check. In my opinion this is a bad design if I have to rely on developers to always implement it properly. I make such mistakes all the time and I want my application to be secure by default instead of just opening an endpoint to the whole world by default. I want to make the decision of making an endpoint public a conscious one.
There is a `defaultStrategy` you can set for Passport.js, but what that will do is instead of typing:
```javascript
@UseGuards(AuthGuard('jwt'))
```
you could type just:
```javascript
@UseGuards(AuthGuard())
```
if you have set `jwt` as your default authentication strategy. So we will have to implement the logic ourselves.

TODO
- add .env (configurations service) for environment variables
- remove /auth/constants.ts