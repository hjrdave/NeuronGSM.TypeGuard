## Type Checking
NeuronGSM allows for explicit types on store items. If a store item is explicitly typed then that store item must be updated with the set type. If the type is invalid then the dispatch will be cancelled. It also allows for some internal optimizations.

```jsx
<State
    type={'string'}
    name={'fruit'}
    state={'apple'}
/>
```
### Type Options

- `string`
- `boolean`
- `number`
- `object` - Does a shallow comparison on dispatch state and cancels the dispatch if the dispatch state has not changed.
- `array` - Checks to see if the dispatched state is different from the current state and prevents update if it has not changed.

## Advanced Setters  
Setters like `setFruit` take new state as a parameter and update the store. Not only do they do this but you can also pass them a selector function `(prev) => any` to get the previous state and use it to return a new state. This in turn will be used to update the store. Example below.

```jsx
function Comp(){

    const [fruit, setFruit] = useNeuron('fruit');

    return(
        <p>This is my favorite fruit, {fruit}</p>
        <button onClick={() => setFruit((prev) => `Asian ${prev}`)}>Change Fruit</button>
    );
}
```