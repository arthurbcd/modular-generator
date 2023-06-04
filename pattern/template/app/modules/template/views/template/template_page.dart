import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'template_controller.dart';

class TemplatePage extends StatelessWidget {
  const TemplatePage({super.key});

  /// Get instance of [TemplateController].
  TemplateController get controller => Modular.get();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(),
    );
  }
}
