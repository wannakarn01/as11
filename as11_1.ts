abstract class TravelPackage {
    private packageId: string;
    private packageName: string;
    protected basePrice: number;

    constructor(packageId: string, packageName: string, basePrice: number) {
        this.packageId = packageId;
        this.packageName = packageName;
        this.basePrice = basePrice;
    }

    public getPackageId(): string {
        return this.packageId;
    }

    public getPackageName(): string {
        return this.packageName;
    }

    public getBasePrice(): number {
        return this.basePrice;
    }

    abstract calculatePrice(people: number): number;
}
class OneDayTrip extends TravelPackage {
    constructor(packageId: string, packageName: string, basePrice: number) {
        super(packageId, packageName, basePrice);
    }

calculatePrice(people: number): number {
        return this.basePrice * people * 0.90;
    }
}
class OvernightTrip extends TravelPackage {
    private numberOfNights: number;

    constructor(packageId: string, packageName: string, basePrice: number, numberOfNights: number) {
        super(packageId, packageName, basePrice);
        this.numberOfNights = numberOfNights;
    }
calculatePrice(people: number): number {
        return this.basePrice * people * this.numberOfNights * 0.85;
    }
}
class Customer {
    private customerId: string;
    private name: string;
    private phone: string;

    constructor(customerId: string, name: string, phone: string) {
        this.customerId = customerId;
        this.name = name;
        this.phone = phone;
    }

    public getName(): string {
        return this.name;
    }
}

class BookingDetail {
    private travelPackage: TravelPackage;
    private people: number;

    constructor(travelPackage: TravelPackage, people: number) {
        this.travelPackage = travelPackage;
        this.people = people;
    }

    public getPackage(): TravelPackage {
        return this.travelPackage;
    }

    public getPeople(): number {
        return this.people;
    }

    public calculateSubtotal(): number {
        return this.travelPackage.calculatePrice(this.people);
    }
}

class Booking {
    private bookingId: string;
    private customer: Customer;
    private details: BookingDetail[] = [];

    constructor(bookingId: string, customer: Customer) {
        this.bookingId = bookingId;
        this.customer = customer;
    }

    public addDetail(travelPackage: TravelPackage, people: number): void {
        this.details.push(new BookingDetail(travelPackage, people));
    }

    public calculateTotalPrice(): number {
        return this.details.reduce((sum, item) => sum + item.calculateSubtotal(), 0);
    }

    public displayBooking(): void {
        console.log(`===== Booking Detail =====`);
        console.log(`Booking ID: ${this.bookingId}`);         console.log(`Customer: ${this.customer.getName()}`);
        this.details.forEach((item, index) => {
            const pkg = item.getPackage();
            console.log(`${index + 1}.${pkg.getPackageName()} (${item.getPeople()} people) - Price:${item.calculateSubtotal()} Baht`);
        });
        console.log(`Total Price: ${this.calculateTotalPrice()} Baht`);
        console.log(`--------------------------\n`);
    }
}

class TravelAgency {
    private agencyName: string;
    private packages: TravelPackage[] = [];

    constructor(agencyName: string) {
        this.agencyName = agencyName;
    }

    public addPackage(travelPackage: TravelPackage): void {
        this.packages.push(travelPackage);
    }

    public displayPackages(): void {
        console.log(`Travel Packages offered by ${this.agencyName}:`);
        this.packages.forEach((pkg, index) => {
            console.log(`${index + 1}. Package ID:${pkg.getPackageId()}, Name: ${pkg.getPackageName()}, Base Price:${pkg.getBasePrice()} Baht`);
        });
        console.log(``);
    }
}

const agency = new TravelAgency("Sunset Travel");

const trip1 = new OneDayTrip("P001", "Bangkok City Tour", 1600);
const trip2 = new OvernightTrip("P002", "Chiang Mai Trip", 2500, 3);

agency.addPackage(trip1);
agency.addPackage(trip2);
agency.displayPackages();

const customer1 = new Customer("C001", "Alice", "081-234-5678");
const booking1 = new Booking("B001", customer1);

booking1.addDetail(trip1, 1);
booking1.addDetail(trip2, 2);

booking1.displayBooking();