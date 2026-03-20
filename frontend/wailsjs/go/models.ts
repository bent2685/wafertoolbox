export namespace main {
	
	export class WaferPoint {
	    x: number;
	    y: number;
	
	    static createFrom(source: any = {}) {
	        return new WaferPoint(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.x = source["x"];
	        this.y = source["y"];
	    }
	}
	export class WaferMapExportRequest {
	    fileName: string;
	    rowCount: number;
	    colCount: number;
	    xDies: number;
	    yDies: number;
	    centerX: number;
	    centerY: number;
	    radius: number;
	    maxImageSize: number;
	    passPoints: WaferPoint[];
	    failPoints: WaferPoint[];
	
	    static createFrom(source: any = {}) {
	        return new WaferMapExportRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.fileName = source["fileName"];
	        this.rowCount = source["rowCount"];
	        this.colCount = source["colCount"];
	        this.xDies = source["xDies"];
	        this.yDies = source["yDies"];
	        this.centerX = source["centerX"];
	        this.centerY = source["centerY"];
	        this.radius = source["radius"];
	        this.maxImageSize = source["maxImageSize"];
	        this.passPoints = this.convertValues(source["passPoints"], WaferPoint);
	        this.failPoints = this.convertValues(source["failPoints"], WaferPoint);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

