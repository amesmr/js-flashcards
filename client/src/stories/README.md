# Using Storybook

## Creating a Story
1. Navigate to client/src/stories/index.js
2. Import component 
    ```
    import componentName from '../components/ComponentName' 
    ```

3. Create story
    ```
    storiesOf("ComponentName", module)
    .add("text to describe component", () => (
        <ComponentName />
    ));
    ```

## Run and Open Storybook

4. Navigate to client on CLI

5. Run Storybook script
    ```
    npm run storybook
    ```

6. Click link in CLI to open Storybook
    ```
    info Storybook started on => http://localhost:9009/
    ```

