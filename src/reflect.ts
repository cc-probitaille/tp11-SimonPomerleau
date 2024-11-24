export async function createClassByReflection<T>(
    modulePath: string,
    classNameEnvVar: string,
    constructorArgs: any[] = []
  ): Promise<T> {
    const className = process.env[classNameEnvVar];
  
    if (!className) {
      throw new Error(`Environment variable "${classNameEnvVar}" is not defined`);
    }
  
    // Dynamically import the module containing the classes
    const module = await import(modulePath);
    const ClassToInstantiate = module[className];
  
    if (!ClassToInstantiate) {
      throw new Error(`Class "${className}" not found in module "${modulePath}"`);
    }
    const instance = new ClassToInstantiate(...constructorArgs) as T;

    // Overwrite the sayHello method dynamically
    (instance as any).sayHello = function () {
      return `Overwritten method: ${this.message}`;
    };
  
    return instance;
  }
  