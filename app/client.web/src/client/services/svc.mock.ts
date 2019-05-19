import { IServices } from "./definitions";
import { MockAuthService } from "./auth/svc.mock";
import { MockUserService } from "./user/svc.mock";
import { MockErrorsService } from "./errors/svc.mock";

export class MockServices implements IServices {
  public auth: MockAuthService;
  public user: MockUserService;
  public errors: MockErrorsService;

  public constructor() {
    this.auth = new MockAuthService();
    this.user = new MockUserService();
    this.errors = new MockErrorsService();
  }
}
