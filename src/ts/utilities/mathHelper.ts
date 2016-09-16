

export class MathHelper {
    
    static toDeg(rad: number):number {
        return rad / Math.PI * 180;
    }
    
    static toRad(deg: number): number{
        return deg * Math.PI / 180;
    }
}