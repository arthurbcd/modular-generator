import 'package:branvier/branvier.dart';
import 'package:branvier/state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'app_module.dart';
import 'services/app/theme_service.dart';

class AppWidget extends StatelessWidget {
  const AppWidget({super.key});

  ThemeService get theme => Modular.get();

  @override
  Widget build(BuildContext context) {

    return ModuleBuilder<AppModule>(
      builder: (_) {
        return Obx(
          () => MaterialApp.router(
            //Theme
            theme: theme.data,

            //Translation
            key: Translation.key,
            localizationsDelegates: Translation.delegates,

            //Routes
            routeInformationParser: Modular.routeInformationParser,
            routerDelegate: Modular.routerDelegate,
          ),
        );
      },
    );
  }
}
