import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'template_controller.dart';

///[TemplatePage] is a view controlled by [TemplateController].
class TemplatePage extends StatelessWidget {
  const TemplatePage({super.key});

  /// Get instance of [TemplateController].
  TemplateController get controller => Modular.get();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(Modular.to.path)),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ElevatedButton(
              onPressed: controller.onIncrement,
              onLongPress: controller.onDecrement,
              child: Text(controller.count),
            ),
            ElevatedButton(
              onPressed: Modular.to.pop,
              child: const Text('Back'),
            ),
          ],
        ),
      ),
    );
  }
}
