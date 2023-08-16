export default class RenderGuard {

    //primitive compare
    public static isEquals = (value: any, value2: any) => {
        return value === value2;
    }

    //compares two arrays to see if they are equal (works even if item order is different) (does shallow compare for object arrays)
    public static compareArrays = (arr: any[], arr2: any[]): boolean => {
        if (arr?.length !== arr2?.length) return false;

        const aSorted = arr?.map((el) => JSON.stringify(el)).sort();
        const bSorted = arr2?.map((el) => JSON.stringify(el)).sort();

        for (let i = 0; i < aSorted?.length; i++) {
            if (aSorted[i] !== bSorted[i]) return false;
        }

        return true;
    }


    //does a shallow compare of two objects and their properties
    public static shallowCompare = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
            const isParamsObjects = typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 !== null && obj2 !== null;
           if(isParamsObjects){
                const aKeys = Object.keys(obj1);
                const bKeys = Object.keys(obj2);
                if (aKeys.length !== bKeys.length) {
                    return false;
                }
                for (const key of aKeys) {
                    if (obj1[key] !== obj2[key]) {
                        return false;
                    }
                }
                return true;
            }
            return true;
    }

    public static stateCanRender = (value?: any, value2?: any) => {
        const type: any = '';//temp solution until i fix this
        const Guards = {
            ['object']: () => (!RenderGuard.shallowCompare(value, value2)),
            ['array']: () => (!RenderGuard.compareArrays(value, value2)),
            'default': () => (!RenderGuard.isEquals(value, value2))
        }
        if (type !== undefined) {
            return (type === 'object' || type === 'array') ? Guards['array']() : Guards['default']();
        } else {
            return Guards['default']();
        }
    }
};


