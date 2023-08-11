import 'package:flutter_modular/flutter_modular.dart';

import 'modules/home/views/home_page.dart';

class AppModule extends Module {
  @override
  void binds(Injector i) {}

  @override
  void routes(RouteManager r) {
    r.child('/', child: (_) => const HomePage());
  }
}
