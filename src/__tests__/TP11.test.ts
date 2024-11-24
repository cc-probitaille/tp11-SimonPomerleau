import { createClassByReflection } from '../reflect';
import { ClassA, ClassB} from '../classes';
  
describe('Reflection-based Class Creation', () => {
    it('should dynamically create an instance of ClassA with parameters', async () => {
      process.env.CLASS_NAME = 'ClassA';
      const instance = await createClassByReflection<ClassA>('./classes', 'CLASS_NAME', ['Dynamic Message']);
      const classA = new ClassA('Dynamic Message');
      expect(classA.sayHello()).toBe('Hello from ClassA: Dynamic Message');
      expect(instance.sayHello()).toBe('Overwritten method: Dynamic Message');
    });
  
    it('should dynamically create an instance of ClassB with parameters', async () => {
      process.env.CLASS_NAME = 'ClassB';
      const instance = await createClassByReflection<ClassB>('./classes', 'CLASS_NAME', [3, 7]);
      expect(instance.sum()).toBe(10);
    });
  
    it('should throw an error if the class is not found', async () => {
      process.env.CLASS_NAME = 'NonExistentClass';
      await expect(
        createClassByReflection<ClassA>('./classes', 'CLASS_NAME')
      ).rejects.toThrow('Class "NonExistentClass" not found in module "./classes"');
    });
  
    it('should throw an error if the environment variable is not set', async () => {
      delete process.env.CLASS_NAME;
      await expect(
        createClassByReflection<ClassA>('./classes', 'CLASS_NAME')
      ).rejects.toThrow('Environment variable "CLASS_NAME" is not defined');
    });
});