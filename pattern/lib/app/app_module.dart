import 'package:flutter_modular/flutter_modular.dart';

import 'modules/home/home_module.dart';

class AppModule extends Module {
  @override
  final List<Bind> binds = [
    // * Sources
    // todo: implement

    // * Repositories
    // todo: implement

    // * Services
    // todo: implement
  ];

  @override
  final List<ModuleRoute> routes = [
    ModuleRoute('/home', module: HomeModule()),
  ];
}
