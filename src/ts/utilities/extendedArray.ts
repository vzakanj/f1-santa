


export type Predicate<T> = (item: T) => boolean;

export class ExtendedArray<T> extends Array<T> {


    first(predicate: Predicate<T>): T {
        var obj = this.firstOrDefault(predicate);
        if (obj == null) {
            throw new Error("Unable to find element based on predicate.");
        }
        return obj;
    }

    firstOrDefault(predicate: Predicate<T>): T {
        for (var i in this) {
            if (predicate(this[i])) {
                return this[i];
            }
        }
        return null;
    }

    where(predicate: Predicate<T>): ExtendedArray<T> {
        var returnArray = new ExtendedArray<T>();
        for (var i in this) {
            if (predicate(this[i])) {
                returnArray.push(this[i]);
            }
        }
        return returnArray;
    }

    take(amount: number): ExtendedArray<T> {
        var r = new ExtendedArray<T>();
        var count = this.length > amount ? amount : this.length;
        for (var i = 0; i < count; i++) {
            r.push(this[i]);
        }
        return r;
    }

    takeWhere(amount: number, predicate: Predicate<T>): ExtendedArray<T> {
        var r = new ExtendedArray<T>();
        var count = this.length > amount ? amount : this.length;
        for(var i in this){
            if(predicate(this[i]) && r.length < count){
                r.push(this[i]);
            }else if(r.length > count){
                return r;                
            }
        }
        return r;
    }
}