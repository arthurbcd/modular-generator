import 'package:flutter_modular/flutter_modular.dart';
import 'package:getx_lite/getx_lite.dart';

///Controls TemplatePage.
class TemplateController extends Disposable {
  // * Dependencies
  // final TemplateService _template = Modular.get();

  // * States
  final _count = 1.obs;

  // * Getters
  String get count => _count.string;

  // * Events
  void onIncrement() => _count.value++;
  void onDecrement() => _count.value++;

  @override
  void dispose() {
    // _service
  }
}
