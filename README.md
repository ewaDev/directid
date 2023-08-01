This project lives on a deployed [site](https://directid.vercel.app/) 

## Getting Started
Install your dependencies and run 
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

### Design Decisions

1. I have used NextJs as a framework since next js provides you with many things out of the box such as routing. It is also a recommended framework in the react documentation
2. I used tailwind for css as it is widely used and since this did not require a lot of styling and custom properies, it was a good choice. Also with tailwind, you only import what you use which improves performance
2. I had to change the rendering as I had a server error as my components were not hydrating properly.
3. I used getStaticProps to load data at built time to make it speedier and prevent undecessary page re-renders.
4. I used react tanstack table as it had sorting already implemented and it holds internal state for sorting. My pure table implementation would never be better than the 365 people that worked on it over the past years. 
5. On mozilla, the border-radius property is not applied to table rows  so I had to make rows transparent and round the cells themselves. Tailwind  itself doesn't have a specific class for targeting the firs, last and even children so I have stuck it in global styles for now. If there were other table designs we could revise this 
6.  I deployed the solution using vercel
