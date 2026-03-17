## Implementation Notes

### What I completed

- Github user search with profile display
- Repository listing with pagination (20 per page and Load More button)
- Repository sorting by Recently Updated (default) and Most Starred
- Repository Details page with metadata and link to Github
- Minimum accessibility
- Basic error handling and display

### Trade-offs

- Client side sorting to prevent new API calls: The GitHub API `/user/{username}/repos endpoint does not support ordering by stars. I decided to implement client side sorting instead of looking for another API endpoint which would need extra requests. This can also be considered for rate limits in APIs.
- Inline styles in most places: Almost all files I am using inline styles. Inside components folder I used CSS Modules so the component file won't get too big. This reduces maintainability and reusability but simplifies the implementation and cut the time to write the code.
- Fetch logic inside page components: This was faster to implement but creates some code duplication/dependencies and make it hard to test.

### What I would improve with more time

- Configurable `per_page` param allowing users to control page size
- Deal with deduplication: Github API can return duplicate repositories (multiple forks of same repo, for example). I would deal with this by some API-level solution or client-side deduplication using `Map` and `Set` to prevent duplication on repository listing before render.
- UI/UX polish: Use TailwindCSS for styling and drastically improve pages visual, listing items, hover effects, add responsive design, loading spinner, skeletons and add animations.
- Custom hooks for data fetching: I would extract fetching logic into reusable hooks (`useGithubUser`, `useGithubRepos`, `useRepoDetails`) to improve testability and separate fetch logic from page components
- I would add `prettier` and `eslint` to improve code quality standards and validate TypeScript on runtime. This would increase develop time and prevent lots of bugs.
- Advanced accessibility: Add extra level of compliance to WCAG
- Add unit testing

### Extra notes

I had some trouble to commit and push changes throughout StackBlitz.
I tried using it sometimes but the commit button got stucked, loading forever and didn't finish.
To solve this I cloned the repository and used an IDE on my personal computer.
I was able to commit and push the changes that way and the changes are visible on my StackBlitz url.
Given that I committed all the changes in a single commit. I would have done differently, with incremental commits otherwise.
