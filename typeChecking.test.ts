import NeuronGSM from "..";

interface State{
    fruit: string;
    person: {
        name: string,
        birthday: string,
        age: number
    };
    list: string[];
    year: 2023;
    enableDarkMode: boolean;
}
enum StateKeys {
    Fruit = "fruit",
    Person = "person",
    List = "list",
    Year = "year",
    EnableDarkMode = "enableDarkMode"
}
const StateValues = {
    fruit: "Apple",
    person: {
        name: 'John',
        birthday: '1980',
        age: 43
    },
    list: ['one', 'two', 'three'],
    year: 2023,
    enableDarkMode: false
}
const Store = NeuronGSM.Store<State>();

Store.add<string>({
    type: 'string',
    key: StateKeys.Fruit,
    state: StateValues.fruit,
});

Store.add<typeof StateValues.person>({
    type: 'object',
    key: StateKeys.Person,
    state: StateValues.person,
});

Store.add<string[]>({
    type: 'array',
    key: StateKeys.List,
    state: StateValues.list,
});

Store.add<number>({
    type: 'number',
    key: StateKeys.Year,
    state: StateValues.year,
});

Store.add<boolean>({
    type: 'boolean',
    key: StateKeys.EnableDarkMode,
    state: StateValues.enableDarkMode,
});

describe("Type guards should prevent state values with the wrong type from be set.", () => {
    it("Type is saved to store", () => {
        const fruitStoreItem = Store.getStore()[0];
        expect(fruitStoreItem.type).toBe('string');
    });

    it("Fruit state should only accept string types.", () => {
       Store.set(StateKeys.Fruit, false);
       expect(Store.get(StateKeys.Fruit)).toBe(StateValues.fruit);

       Store.set(StateKeys.Fruit, true);
       expect(Store.get(StateKeys.Fruit)).toBe(StateValues.fruit);

       Store.set(StateKeys.Fruit, undefined);
       expect(Store.get(StateKeys.Fruit)).toBe(StateValues.fruit);

       Store.set(StateKeys.Fruit, null);
       expect(Store.get(StateKeys.Fruit)).toBe(StateValues.fruit);

       Store.set(StateKeys.Fruit, {foo: 'foo'});
       expect(Store.get(StateKeys.Fruit)).toBe(StateValues.fruit);

       Store.set(StateKeys.Fruit, ['foo']);
       expect(Store.get(StateKeys.Fruit)).toBe(StateValues.fruit);

       Store.set(StateKeys.Fruit, 'Pineapple');
       expect(Store.get(StateKeys.Fruit)).toBe('Pineapple');
       
    });

    it("Person state should only accept object types.", () => {
        Store.set(StateKeys.Person, false);
        expect(Store.get(StateKeys.Person)).toBe(StateValues.person);
 
        Store.set(StateKeys.Person, true);
        expect(Store.get(StateKeys.Person)).toBe(StateValues.person);

        Store.set(StateKeys.Person, undefined);//
        expect(Store.get(StateKeys.Person)).toBe(StateValues.person);
 
        Store.set(StateKeys.Person, null);
        expect(Store.get(StateKeys.Person)).toBe(StateValues.person);
 
        Store.set(StateKeys.Person, 'foo');
        expect(Store.get(StateKeys.Person)).toBe(StateValues.person);
 
        Store.set(StateKeys.Person, ['foo']);
        expect(Store.get(StateKeys.Person)).toBe(StateValues.person);
 
        const updatedPerson = {
            name: 'Johnson',
            birthday: '1980',
            age: 43
        };
        Store.set(StateKeys.Person, updatedPerson);//this is not updating
        expect(Store.get(StateKeys.Person)).toStrictEqual(updatedPerson);
        
     });

     it("List state should only accept array types.", () => {
        Store.set(StateKeys.List, false);
        expect(Store.get(StateKeys.List)).toBe(StateValues.list);
 
        Store.set(StateKeys.List, true);
        expect(Store.get(StateKeys.List)).toBe(StateValues.list);
 
        Store.set(StateKeys.List, undefined);
        expect(Store.get(StateKeys.List)).toBe(StateValues.list);
 
        Store.set(StateKeys.List, null);
        expect(Store.get(StateKeys.List)).toBe(StateValues.list);
 
        Store.set(StateKeys.List, {foo: 'foo'});
        expect(Store.get(StateKeys.List)).toBe(StateValues.list);

        Store.set(StateKeys.List, 'Pineapple');
        expect(Store.get(StateKeys.List)).toBe(StateValues.list);

        Store.set(StateKeys.List, ['foo']);
        expect(Store.get<string[]>(StateKeys.List)[0]).toBe('foo');
        
     });

     it("Year state should only accept number types.", () => {
        Store.set(StateKeys.Year, false);
        expect(Store.get(StateKeys.Year)).toBe(StateValues.year);
 
        Store.set(StateKeys.Year, true);
        expect(Store.get(StateKeys.Year)).toBe(StateValues.year);
 
        Store.set(StateKeys.Year, undefined);
        expect(Store.get(StateKeys.Year)).toBe(StateValues.year);
 
        Store.set(StateKeys.Year, null);
        expect(Store.get(StateKeys.Year)).toBe(StateValues.year);
 
        Store.set(StateKeys.Year, {foo: 'foo'});
        expect(Store.get(StateKeys.Year)).toBe(StateValues.year);

        Store.set(StateKeys.Year, 'Pineapple');
        expect(Store.get(StateKeys.Year)).toBe(StateValues.year);

        Store.set(StateKeys.Year, ['foo']);
        expect(Store.get(StateKeys.Year)).toBe(StateValues.year);

        Store.set(StateKeys.Year, 0);
        expect(Store.get(StateKeys.Year)).toBe(0);

        Store.set(StateKeys.Year, 1);
        expect(Store.get(StateKeys.Year)).toBe(1);
        
     });

     it("enableDarkMode state should only accept boolean types.", () => {
       Store.set(StateKeys.EnableDarkMode, 'foo');
       expect(Store.get(StateKeys.EnableDarkMode)).toBe(StateValues.enableDarkMode);

       Store.set(StateKeys.EnableDarkMode, undefined);
       expect(Store.get(StateKeys.EnableDarkMode)).toBe(StateValues.enableDarkMode);

       Store.set(StateKeys.EnableDarkMode, null);
       expect(Store.get(StateKeys.EnableDarkMode)).toBe(StateValues.enableDarkMode);

       Store.set(StateKeys.EnableDarkMode, {foo: 'foo'});
       expect(Store.get(StateKeys.EnableDarkMode)).toBe(StateValues.enableDarkMode);

       Store.set(StateKeys.EnableDarkMode, ['foo']);
       expect(Store.get(StateKeys.EnableDarkMode)).toBe(StateValues.enableDarkMode);

       Store.set(StateKeys.EnableDarkMode, true);
       expect(Store.get(StateKeys.EnableDarkMode)).toBe(true);

       Store.set(StateKeys.EnableDarkMode, false);
       expect(Store.get(StateKeys.EnableDarkMode)).toBe(false);
       
    });
});