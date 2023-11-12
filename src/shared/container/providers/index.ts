import { container } from 'tsyringe'

import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IDateProvider } from './DateProvider/IDateProvider'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
)