export interface logonReturnSuccess {
    success: boolean;
    token: string;
}

export interface logonReturnFail {
  success: boolean;
  message: string;
}

export type logonReturn = logonReturnSuccess | logonReturnFail;

export interface signUpReturn {
  success: boolean;
  message?: string;
  alt?: string;
}

export type callback = (...arg0: any[]) => any;